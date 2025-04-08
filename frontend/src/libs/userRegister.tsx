export default async function userRegister(userName:string,userTel:string,userEmail:string,userPassword:string){
    const response = await fetch(`${BACKEND}/api/v1/auth/register`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            name : userName,
            tel : userTel,
            email : userEmail,
            password : userPassword,
            role : "user"
        })
    })

    console.log('Response:', response);

    if(!response.ok){   
        const errorData = await response.json();
        console.log('Error Data:', errorData); 
        throw new Error(errorData?.message || "Registration failed");
    }

    return await response.json()
}