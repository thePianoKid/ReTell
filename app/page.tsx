import { Button } from "@/components/ui/button"
import Nav from "@/components/Nav"
import Link from "next/link"

export default function Home() {
  return (
    <main className="p-10">
      <div>
        <section className="py-24 flex flex-col items-center text-center gap-8">
          <h1 className="text-4xl font-bold">Welcome to ReTell</h1>
          <p className="text-1xl text-muted-foreground">Enriching short stories where your child is the main character ✨</p>
          <div className="flex gap-6 py-6">
            <Button><Link href="/try">Try It</Link></Button>
            <Button variant={"secondary"}>Learn More</Button>
          </div>
        </section>
      </div>
    </main>
  )
}
