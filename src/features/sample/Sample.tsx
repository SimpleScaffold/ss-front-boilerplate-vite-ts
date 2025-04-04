import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

const Sample = () => {

    const navigate = useNavigate();

    const [cccc, setCccc] = useState(0)

    useEffect(() => {
        console.log(cccc)
    }, [cccc])

    return (
        <div>

            <button
                onClick={() => {
                    navigate('/')
                }}
            >씨맙
            </button>


            <div>
                <button
                    onClick={() => {
                        navigate('/sample/sample')
                    }}
                >sssssssssssss
                </button>

            </div>
            {cccc}
            <button
                onClick={() => {
                    setCccc((state) => state+1)
                }}
            >bbbbbbbbbbbbbbbbbbbbbbb
            </button>
            sdfsdfd
            sdfsdfd
        </div>
    );
};

export default Sample;