import { createBrowserRouter } from "react-router-dom";
//-------------------------------------------------------------------
import Error from "./2-shared/components/error/Error";
import RootLayout from "./2-shared/layout/RootLayout";
//-------------------------------------------------------------------
import { action as UpdateUserProfileAction } from "./1-features/user/pages/action"
import { action as LoginPageAction } from "./1-features/auth/pages/Login/action"
import { action as SignupPageAction } from "./1-features/auth/pages/Signup/action"
import { action as LogoutPageAction } from "./1-features/auth/pages/Logout/action"
//------------------------
import { loader as TokenLoader } from "./2-shared/auth/tokenLoader"
import { loader as UserPageLoader } from "./1-features/user/pages/loader"
import { loader as DetailPageLoader } from "./1-features/supplement/pages/supplementDetails/loader"
//------------------------
import SupplementPage from "./1-features/supplement/pages/SupplementPage/supplement_page";
import UserProfile from "./1-features/user/pages/UserProfile";
import SupplementOutlet from "./1-features/supplement/pages/Outlet/SupplementOutlet";
import DetailsPage from "./1-features/supplement/pages/supplementDetails/details_page";
import LoginPage from "./1-features/auth/pages/Login/login_page";
import SignupPage from "./1-features/auth/pages/Signup/signup_page";
import HomePage from "./1-features/home/pages/Home";
import CheckOutPage from "./1-features/check_out/pages/CheckOutPage";
import Trainers from "./1-features/trainers/pages/Trainers";
//-------------------------------------------------------------------


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        // errorElement: <Error />,
        loader: TokenLoader,
        id: "root",
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "supplement",
                element: <SupplementOutlet />,
                children: [
                    {
                        index: true,
                        element: <SupplementPage />
                    },
                    {
                        path: ":id",
                        element: <DetailsPage />,
                        loader: DetailPageLoader
                    }
                ]
            },
            {
                path: "trainers",
                element: <Trainers />,
            },
            {
                path: "auth",
                children: [
                    {
                        path: "login",
                        element: <LoginPage />,
                        action: LoginPageAction
                    },
                    {
                        path: "signup",
                        element: <SignupPage />,
                        action: SignupPageAction
                    },

                ]
            },
            {
                path: "user",
                element: <UserProfile />,
                loader: UserPageLoader,
                action: UpdateUserProfileAction
            },
            {
                path: "check-out",
                element: <CheckOutPage />
            },
            {
                path: "logout",
                action: LogoutPageAction
            },
            {
                path: "*",
                element: <Error />
            }
        ]
    },
]);

export default router;