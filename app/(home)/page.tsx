import { About } from "./(components)/about"
import { Gallery } from "./(components)/gallery"
import { Hero } from "./(components)/hero"
import { Services } from "./(components)/services"
import { Words } from "./(components)/words"

export default async function Page() {
  return (
    <>
      <Hero />
      <Words />
      <Services />
      <About />
      <Gallery />
    </>
  )
}
