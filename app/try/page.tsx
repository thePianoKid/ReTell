import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/app/try/profile-form";
import { Card } from "@/components/ui/card";

export default function Try() {
  return (
    <div className="p-10">
      <Card>
        <h3 className="p-5 text-2xl font-bold">Customize Your Story</h3>
        <p className="pl-5 pb-5 text-sm text-muted-foreground">
          Customize your child&apos;s bedtime story; add a few details, and we&apos;ll handle the rest ✨
        </p>
        <Separator />
        <ProfileForm />
      </Card>
    </div>
  );
}
