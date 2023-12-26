import { HTMLAttributes } from "react"
import { Colors } from "../constants"

export const Page = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      style={{
        backgroundColor: Colors.Dark,
        minHeight: `100vh`,
        color: Colors.SoftWhite,
        fontSize: `1.6rem`,
        padding: `16px`,
        ...props.style,
      }}
    />
  )
}