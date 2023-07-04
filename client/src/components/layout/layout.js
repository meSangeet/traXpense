import react from 'react'
import Header from './header'
import Footer from './footer'

const Layout = ({children}) => {
    return (
        <>
        <Header></Header>
        <div className="content">
            {children}
        </div>
        <Footer></Footer>
        </>
    )
}

export default Layout