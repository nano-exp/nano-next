import indexHtml from '../public/index.html'

function Home() {
}

Home.getInitialProps = ({ req, res }) => {
    res.setHeader('content-type', 'text/html')
    res.end(indexHtml)
}

export default Home
