"use client"
import { useUser } from "@auth0/nextjs-auth0/client"

const Home = () => {
  const {user, checkSession} = useUser()
  return (
    <>
        Welcome, {user?.name}
    </>
  )
}

export default Home