import { PlaneTakeoff } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const FooterCurrentLocation = ({target}) => {
  return (
    <HoverCard>
    <HoverCardTrigger asChild>
      <Button variant="outline" className="justify-center items-center flex  animate-jiggle">{target}</Button>
    </HoverCardTrigger>
    <HoverCardContent className="w-80 ml-8">
      <div className="flex justify-between space-x-4">
        {/* <Avatar>
          <AvatarImage src="https://github.com/vercel.png" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar> */}
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Currently: Vancouver, BC</h4>
          <p className="text-sm">
          😪 Daydreaming of the next trip while working at the hospital.
          </p>
          <div className="flex items-center pt-2">
            <PlaneTakeoff  className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              Next trip: New Mexico
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
  )
}

export default FooterCurrentLocation