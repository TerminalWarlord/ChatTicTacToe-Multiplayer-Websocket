const DUMMY_DATA = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
]

export default function Board() {
    return <div className="w-full border-2 border-gray-100 px-16 py-2 rounded-md">
        {DUMMY_DATA.map(arr => {
            return <div className="flex items-center rounded-lg">
                {arr.map(x => {
                    return <button className="border-[0.7px] border-opacity-15 border-black w-2/4 aspect-square bg-gray-200 flex justify-center items-center rounded m-0.5 text-3xl text-gray-600">X</button>
                })}
            </div>
        })}
    </div>
}