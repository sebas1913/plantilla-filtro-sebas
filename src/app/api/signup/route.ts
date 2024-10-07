import { NextResponse } from "next/server";
import { URL_BASE } from "../../../../URL_BASE";


export async function POST(request: Request) {
    const { email, username, password, name, phone } = await request.json();

    try {
        const response = await fetch(`${URL_BASE}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                username,
                name,
                password,
                phone
            }),
        });

        if (!response.ok) {
            return NextResponse.json({ message: "Error en el registro" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error en el servidor", error }, { status: 500 });
    }
}
