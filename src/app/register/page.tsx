import { queryClient } from '@/lib/reactQuery/queryClient'
import Register from '@/views/Register'
const page = async () => {
  const queryClientLocal = queryClient()

  return (
    <>
      <Register />
    </>
  )
}

export default page