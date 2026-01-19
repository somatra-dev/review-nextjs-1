import {Button} from "@/components/ui/button";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {ArrowUpToLine} from "lucide-react";
import CardCustom from "@/components/CardCustom";
import CardClientList from "@/components/CardClientList";
import {fetchPosts} from "@/lib/data/fetchPost";


export default function Home() {

  return (
    <div className="gap-10 mt-20 items-center justify-center flex flex-col">
      <Button variant="destructive" size="lg">Click Me <ArrowUpToLine></ArrowUpToLine></Button>
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <CardCustom
        userId={1}
        id={1}
        body="សួស្តី អ្នកគឺជាអ្នកអានដ៏អស្ចារ្យ!"
        title="ស្វាគមន៍មកកាន់ Next.js"
      />

      <CardClientList fetchPosts={fetchPosts()} />
    </div>
  );
}
