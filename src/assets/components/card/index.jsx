const Card = ({poster, title, isLoading}) => {
    if (isLoading) {
        return(
            <div className="rounded flex flex-col animate-pulse">
                <div className={'h-40 p-2'}>
                    <div className="w-full h-full bg-slate-400 rounded-md"></div>
                </div>
                <div className="h-10 p-2">
                    <div className="h-full w-full bg-slate-400 rounded-md"></div>
                </div>
            </div>
        )
    }
    return(
        <div className="rounded flex flex-col group/card">
            <div className='h-40 relative'>
                <img src={poster} className="w-full h-40 object-cover rounded-t-md" alt={title} />
            </div>
            <div className=" h-12 px-2 flex items-center justify-center bg-cyan-600 text-white w-full group-hover/card:bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-md">
                {title}
            </div>
        </div>
    )
}

export default Card