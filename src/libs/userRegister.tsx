export default async function userRegister(userName:string,userTel:string,userEmail:string,userPassword:string,role:string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/register`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            name : userName,
            tel : userTel,
            email : userEmail,
            password : userPassword,
            role : role
        })
    })

    console.log('Response:', response);

    if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData?.message || "Registration failed");
        } else {
          const errorText = await response.text();
          throw new Error(errorText || "Registration failed");
        }
      }

    return await response.json()
}