import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtVerifyOptions } from "@nestjs/jwt";
import {
  ActivationDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from "./dto/user.dto";
import { PrismaService } from "../../prisma/Prisma.service";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { EmailService } from "./email/email.service";
import { TokenSender } from "./utils/sendToken";
import { User } from "@prisma/client";

interface UserData {
  name: string;
  email: string;
  password: string;
  phone_number: number;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma:  PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) {}

  //register user
  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password, phone_number } = registerDto;

    //checking wether user mail exist or not
    const isEmailExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      throw new BadRequestException("Email already Exist");
    }

    const phoneNumberExist = await this.prisma.user.findUnique({
      where: {
        phone_number,
      },
    });

    if (phoneNumberExist) {
      throw new BadRequestException("Phone number already Exist");
    }

    //creating Hashed Password
    const hashedPassword = await bcrypt.hash(password, 15);

    const user = {
      name,
      email,
      password: hashedPassword,
      phone_number,
    };

    const activationToken = await this.createActivationToken(user);

    const activationCode = activationToken.activationCode;
    const activation_token = activationToken.token;

    await this.emailService.sendMail({
      email,
      subject: "Activate Your Account",
      template: "./activation-mail",
      name,
      activationCode,
    });

    return { activation_token, response };
  }

  async createActivationToken(user: UserData) {
    //creating 4 digit otp
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>("ACTIVATION_TOKEN"),
        expiresIn: "48h",
      }
    );
    return { token, activationCode };
  }

  //activation user
  async activateUser(activationDto: ActivationDto, resposne: Response) {
    const { activationToken, activationCode } = activationDto;

    const newUser: { user: UserData; activationCode: string } =
      this.jwtService.verify(activationToken, {
        secret: this.configService.get<string>("ACTIVATION_TOKEN"),
      } as JwtVerifyOptions) as { user: UserData; activationCode: string };

    if (newUser.activationCode !== activationCode) {
      throw new BadRequestException("Activation Code is Invalid");
    }

    const { name, email, password, phone_number } = newUser.user;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new BadRequestException("User already Registered with this email");
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        phone_number,
      },
    });
    return { user, resposne };
  }

  //Login User
  async Login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    //comparing whith hash password
    const comapredPassword = await bcrypt.compare(password, user.password);

    if (user && comapredPassword) {
      const tokenSender = new TokenSender(this.configService, this.jwtService);
      return tokenSender.sendToken(user);
    } else {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: {
          message: "Credentials are invalid",
        },
      };
    }
  }

  //genrating forgot password link
  async generateForgotPasswordLink(user: User) {
    const forgotPasswordToken = this.jwtService.sign(
      {
        user,
      },
      {
        secret: this.configService.get<string>("FORGOT_PASSWORD_SECRET"),
        expiresIn: "5m",
      }
    );
    return forgotPasswordToken;
  }

  //Forgot Password
  async ForgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException("User with Email id does not exist");
    }

    const forgotPasswordToken = await this.generateForgotPasswordLink(user);

    const resetPasswordUrl =
      this.configService.get<string>("CLIENT_SIDE_URI") +
      `/reset-password?verify=${forgotPasswordToken}`;

    await this.emailService.sendMail({
      email,
      subject: "Reset your Password",
      template: "./forgot-password",
      name: user.name,
      activationCode: resetPasswordUrl,
    });

    return { message: "Your Forgot password request successful" };
  }

  //Reset Password
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { password, activationToken } = resetPasswordDto;

    const decode = await this.jwtService.decode(activationToken);

    if (!decode || decode?.exp * 1000 < Date.now()) {
      throw new BadRequestException("Invalid Token");
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    const user = this.prisma.user.update({
      where: {
        id: decode.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return { user };
  }

  //Logged In User
  async loginUser(req: any) {
    const user = req.user;
    const refreshToken = req.refreshtoken;
    const accessToken = req.accesstoken;
    return { user, refreshToken, accessToken };
  }

  //Logout User
  async logoutUser(req: any) {
    req.user = null;
    req.refreshtoken = null;
    req.accessToken = null;

    return { message: "Logged out Successfully!" };
  }

  //get all user Service
  async getUsers() {
    return this.prisma.user.findMany({});
  }
}