import { AuthPage } from "@components/auth-page";
import SignInForm from "@components/custom-auth-page/login";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { redirect } from "next/navigation";
import CustomLoginPage from "@components/custom-auth-page/login";

export default async function Login() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  // return <SignInForm />;
  return <CustomLoginPage />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
