'use client'
import { useSearchParams } from "next/navigation";

export default function Story() {
    const searchParams = useSearchParams();
    const name = searchParams.get("eduPrompt")
    console.log(name);
    return (
        <h1>{name}</h1>
    );
}