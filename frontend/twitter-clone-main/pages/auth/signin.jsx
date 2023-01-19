import { getProviders, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

export default function SignIn({ providers }) {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex max-w-xl flex-col items-center gap-5 rounded-[3rem] border p-6 ">
          <div className=" relative   ml-4 h-[4rem] w-[4rem] rounded-full p-[0.3rem] hover:bg-blue-200">
            <Image layout="fill" src="https://links.papareact.com/drq" alt="twitter"></Image>
          </div>

          <h1 className="text-[4rem] font-bold">Happening now</h1>
          <h2 className="text-[2rem] font-bold">Join Twitter today</h2>
          <div className="flex min-w-[15rem] cursor-pointer items-center justify-between rounded-full border p-3 px-6 transition duration-200 active:bg-twitter ">
            {Object.values(providers).map((provider) => (
              //   Here we are looping through all the authentication providers
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
            <FcGoogle className="h-[1.5rem] w-[1.5rem]" />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
