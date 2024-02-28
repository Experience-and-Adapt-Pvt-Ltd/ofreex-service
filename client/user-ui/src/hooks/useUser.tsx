import { GET_USER } from '@/graphql/action/getUser.action'
import { useQuery } from '@apollo/client'

const useUser = () => {
    const {loading,data} = useQuery(GET_USER);
    
  return {
    loading,
    user: data?.loginUser?.user
  }
}

export default useUser
