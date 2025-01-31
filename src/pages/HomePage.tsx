import {reduxMaker} from "@/app/store/reduxUtils.tsx";

const HomePage = () => {


    const {aaaSlice, aaa, asd} = reduxMaker()


    return (
        <div
            className={'bg-amber-50'}
        >

            {aaaSlice}
            HomePage
        </div>
    )
}

export default HomePage;