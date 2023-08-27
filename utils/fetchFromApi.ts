import { Alert } from "react-native";
import { BASE_URL } from "./constants";

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

            return responseData;
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
export const signUpApi = async (data: signup) => {
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
        const response = await fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data
            })
        });
        if (response.ok) {
            const responseData = await response.json()
            return responseData
        }
        console.log('failed to signup')
    } catch (error) {
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
export const fetchCSRFtoken = async () => {
    try {
        const csrfTokenResponse = await fetch(`${BASE_URL}/auth/csrf`, {
            method: 'GET',
            headers: {
                'Content_Type': 'application/json'
            }
        });
        if (csrfTokenResponse.ok) {
            const csrfTokendata = await csrfTokenResponse.data.csrfToken;
            return csrfTokendata
        }

    } catch (error) {

    }
}
export const LoginApi = async (data: login) => {
    try {
        const { username, password } = data
        const csrfTokenResponse = await fetch(`${BASE_URL}/auth/csrf`, {
            method: 'GET',
            headers: {
                'Content_Type': 'application/json'
            }
        });
        const { csrfToken } = await csrfTokenResponse.json()
        const csrf = await csrfToken.csrfToken
        console.log(csrfToken)
        const response = await fetch(`${BASE_URL}/auth/signin/Credentials`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                csrf,
                username,
                password,
                json: true
            })
        })
        const responseData = await response.json()
        console.log(responseData)
        if (response.ok) {
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