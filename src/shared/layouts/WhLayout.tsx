import WhHeader from 'src/shared/layouts/WhHeader.tsx'
import WhFooter from 'src/shared/layouts/WhFooter.tsx'

const WhLayout = ({
    children,
                  }) => {
    return (
        <div>
            <WhHeader />
            {children}
            <WhFooter />
        </div>
    )
}

export default WhLayout