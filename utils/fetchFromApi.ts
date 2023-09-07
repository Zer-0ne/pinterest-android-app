import { Alert } from "react-native";
import { BASE_URL, SessionProps, userProps } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastType } from "react-native-toast-notifications";
// import * as keychain

export const pins = async () => {
    try {
        const response = await fetch(`${BASE_URL}/pins`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const responseData = await response.json()
            const sortedData = await responseData.Pin?.sort((a: any, b: any) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            // setBlogData(sortedData?.reverse())
            return sortedData.reverse()
        }
        console.error('failed to fetch')
        return
    } catch (error) {
        console.log(error)
    }
}
export const singlePin = async (_id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/pins/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const responseData = await response.json()
            const { Pin } = await responseData
            // console.log(Pin)
            return Pin;
        }
    } catch (error) {
        console.log(error)
    }
}
export const userPins = async (_id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/pins/user/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const responseData = await response.json();
            const sortedData = await responseData.pins?.sort((a: any, b: any) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            // setBlogData(sortedData?.reverse())
            return sortedData.reverse()

        } else {
            console.error('Failed to fetch data');
        }
    } catch (error) {
        console.error(error);
    }
}
export const singleUser = async (_id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const responseData = await response.json()
            const { data } = await responseData
            const { user } = await data
            return user;
        }
        console.error('failed to fetch')
        return
    } catch (error) {
        console.error(error)
    }
}
interface signup {
    name: string;
    adminPassword: string,
    email: string,
    otp: number,
    password: string,
    username: string,
    image: string
}
// signUP
export const signUpApi = async (data: signup, setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>, toast: ToastType, id: string) => {
    try {
        const {
            name,
            adminPassword,
            email,
            otp,
            password,
            username,
            image
        } = data
        setIsDisabled(true)
        const response = await fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...data
            })
        });
        if (response.ok) {
            const responseData = await response.json()
            setIsDisabled(false)
            toast.update(id, responseData.message, { type: "success" });
            return responseData
        }
        setIsDisabled(false)
        console.log('failed to signup')
    } catch (error) {
        setIsDisabled(false)
        toast.update(id, 'Something went wrong', { type: "danger" });
        console.error(error)
    }
}

interface login {
    username: string;
    password: string
}
// handle login
interface csrf {
    data: {
        csrfToken: string
    }
}

export const LoginApi = async (data: login, setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>, toast: ToastType, id: string) => {
    try {
        setIsDisabled(true)
        const csrfTokenResponse = await fetch(`${BASE_URL}/auth/csrf`, {
            method: 'GET',
            headers: {
                'Content_Type': 'application/json'
            }
        });
        const { csrfToken } = await csrfTokenResponse.json()

        const response = await fetch(`${BASE_URL}/auth/callback/credentials`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...data,
                csrfToken,
                json: 'true'
            })
        })
        if (response.ok) {
            const responseData = response.json()
            const session = await fetch(`${BASE_URL}/auth/session`, {
                method: 'GET',
                headers: {
                    'Content_Type': 'application/json'
                }
            })
            // console.log(session[set-cookie],'rr')
            if (session.ok) {
                const sessionUser = await session.json()
                if (!sessionUser.expires) {
                    toast.update(id, 'Wrong Credentials', { type: "danger" });
                    setIsDisabled(false)
                    return
                }
                AsyncStorage.setItem('session', JSON.stringify(sessionUser))
                setIsDisabled(false)
                toast.update(id, 'Login Successfully', { type: "success" });
                return sessionUser
            }
            setIsDisabled(false)
            toast.update(id, 'Something went wrong', { type: "danger" });
            return
        }
        setIsDisabled(false)
        toast.update(id, 'Something went wrong', { type: "danger" });
        return

    } catch (error) {
        setIsDisabled(false)
        toast.update(id, 'Something went wrong', { type: "danger" });

        console.log(error)
    }
}

// handle signout function 
export const signOut = async () => {
    try {
        const csrfTokenResponse = await fetch(`${BASE_URL}/auth/csrf`, {
            method: 'GET',
            headers: {
                'Content_Type': 'application/json'
            }
        });
        const { csrfToken } = await csrfTokenResponse.json()
        const response = await fetch(`${BASE_URL}/auth/signout`, {
            method: "post",
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                csrfToken,
                json: "true"
            })
        });
        // console.log(csrfToken)
        // console.log(response)
        if (response.ok) {
            const responseData = await response.json()
            AsyncStorage.removeItem('session')
            console.log(responseData)
            return responseData
        }
    } catch (error) {
        console.log(error)
    }
}

export const handleOtp = async (email: string) => {
    if (!email) {
        alert('please fill the email feild')
    }
    try {
        const response = await fetch(`${BASE_URL}/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        if (response.ok) {
            alert('otp sent!')
        }
        // alert('something went wrong')
    } catch (error) {
        console.log(error)
    }
}

// handle delete pin 
export const deletePin = async (_id: string, toast: ToastType, id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/pins/${_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            const responseData = await response.json()
            toast.update(id, responseData.message, { type: "success" });
            // console.log(responseData)
            return responseData
        }
    } catch (error) {
        console.log(error)
        toast.update(id, 'Something went wrong', { type: "danger" });
    }
}

// handle edit pin 
export const editPin = async (_id: string, data: object, toast: ToastType, id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/pins/${_id}`, {
            method: 'PUT',
            body: JSON.stringify({ ...data }),
        })
        if (response.ok) {
            const responseData = await response.json()
            toast.update(id, responseData.message, { type: "success" });
            return responseData
        }
        return { message: 'failed to fetch!' }
    } catch (error) {
        toast.update(id, 'Something went wrong', { type: "danger" });
        return { message: 'Internal server error', error }
    }
}


// follow request 
export const follow = async (_id: string, toast: ToastType) => {
    let id = toast.show("please wait...");
    try {
        const response = await fetch(`${BASE_URL}/follow/${_id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },

        });
        if (response.ok) {
            const responseData = await response.json();
            toast.update(id, responseData.message, { type: 'success' })
            return responseData;
        }
        else{

            toast.update(id, 'Something Went Wrong', { type: 'danger' })
            return
        }
    } catch (error) {
        console.error(error)
        toast.update(id, 'Something Went Wrong', { type: 'danger' })
    }
}

// create comments
export const newComment = async (data: object) => {
    // const id = toast.loading("Please wait...")
    try {
        const response = await fetch(`${BASE_URL}/comment`, {
            method: 'POST',
            body: JSON.stringify({ ...data }),
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData
        }
    } catch (error) {
        console.log(error)
    }
}

// delete comments
export const deleteComment = async (
    _id: string,
    authorId: string,
    itemUserId: string,
    SessionUser: userProps
) => {
    try {
        if (authorId === SessionUser?.id || itemUserId === SessionUser?.id || SessionUser?.isAdmin) {

            const response = await fetch(`${BASE_URL}/comment/${_id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                const responseData = await response.json()
                return responseData
            }
        }
        return
    } catch (error) {
        console.log(error)
    }
}