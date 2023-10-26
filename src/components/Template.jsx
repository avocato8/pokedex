import './Template.scss';

function Template({children}){
    return(
        <div className="Template">
            <div>{children}</div>
        </div>
    )
}

export default Template;