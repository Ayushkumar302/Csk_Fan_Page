import Header from '../header/Header'
import Footer from '../footer/Footer'
import Routers from '../../routes/Routers'

function Layout() {
  return (
    <div>
    <Header />
    <main>
      <Routers />
    </main>
    <Footer />
  </div>
  )
}

export default Layout