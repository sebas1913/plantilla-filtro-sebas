// import { NextResponse } from "next/server";
// import Cookies from "js-cookie";
// import { URL_BASE } from "../../../../../URL_BASE";

// export async function POST(req: Request, { params }: { params: { id: string } }) {
//     const accessToken = Cookies.get("access_token");

//     try {
//         const response = await fetch(`${URL_BASE}/auth/products/like`, {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${accessToken}`,
//                 "Content-Type": "application/json",
//             },
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return NextResponse.json(data, { status: 201 });
//         } else {
//             const errorData = await response.json();
//             return NextResponse.json({ message: errorData.message || "Error :( " }, { status: response.status });
//         }
//     } catch (error) {
//         console.error("Error al dar 'Me gusta':", error);
//         return NextResponse.json({ message: "Error :(" }, { status: 500 });
//     }
// }
