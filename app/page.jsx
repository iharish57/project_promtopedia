import Feed from "@components/Feed"

export const dynamic = 'force-dynamic';
const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center"> AI-Powerd Prompts</span>
            </h1>
            <p className="desc text-center">
                Promptopedia is an open-source AI prompting tool for modern world to discover, create and share creatice prompts
            </p>
            <Feed />
        </section>
    )
}

export default Home
