import ProcessV1 from '../process/ProcessV1';

const ExpertiseV1 = () => {
    return (
        <>
            <div className="container">
                <div className="expertise-area text-center" style={{marginTop:"100px"}}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="site-heading">
                                <h4 className="sub-title">Our Features </h4>
                                <h2 className="title">What Makes Us Different</h2>
                            </div>
                        </div>
                    </div>
                    <ProcessV1 />
                </div>
            </div>
        </>
    );
};

export default ExpertiseV1;