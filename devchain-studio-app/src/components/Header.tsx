import Devchain_logo from "/Devchain_logo.svg"
import { Image, Button } from "@nextui-org/react"
import { ArrowClockwise, Stop } from "@phosphor-icons/react"

interface HeaderProps{
    reset : () => void
    stop : () => void
}

function Header({reset, stop} : HeaderProps)
{

    return(
        <>
        <div className="py-2 relative gap-y-0 border-none rounded-lg">
            <Button className="absolute left-0 rounded-lg bg-content2" size="sm" isIconOnly onClick={reset}> <ArrowClockwise size={20}/> </Button>
            <Button className="absolute left-8 rounded-lg bg-content2" size="sm" isIconOnly onClick={stop}><Stop size={20} color="#c80e0e" weight="light" /> </Button>
            <div className="flex flex-col items-center justify-center">
                <Image  width={200} src={Devchain_logo} alt="Devchain Logo"/>
                <p className=" text-violet-400 font-bold text-base"> Use LLMs to prototype and build your applications </p>
            </div>
        </div>
        </>
    )
}



export default Header