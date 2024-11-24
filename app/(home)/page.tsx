import { About } from "./(components)/about"
import { Gallery } from "./(components)/gallery"
import { Hero } from "./(components)/hero"
import { Services } from "./(components)/services"
import { Words } from "./(components)/words"
import s from "./page.module.scss"
export default async function Page() {
  return (
    <div className={s.home}>
      <Hero />
      <Words />
      <Services />
      <About />
      <Gallery />
    </div>
  )
}
