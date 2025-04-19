export default async function userRegister(userName:string,userTel:string,userEmail:string,userPassword:string){
    const response = await fetch(`http://localhost:5000/api/v1/auth/register`,{
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