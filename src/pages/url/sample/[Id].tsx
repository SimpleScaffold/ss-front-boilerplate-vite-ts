const Id = () => {
    return <div className="w-screen h-screen ">
        <div className="flex flex-wrap w-full gap-4" >
            {/* 첫 번째 */}
            <div className="w-full lg:w-[450px] shrink-0 grow-0 bg-amber-300">
                첫 번째
            </div>

            {/* 두 번째 */}
            <div className="w-full lg:flex-1 lg:min-w-[450px] bg-amber-400">
                두 번째
            </div>
        </div>
    </div>
}

export default Id
