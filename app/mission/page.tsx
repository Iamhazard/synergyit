import MaxWidthWrapper from '@/components/ui/layouts/MaxWidthWrapper'
import Roadmap from '@/components/ui/mission/Misson'
import OurMission from '@/components/ui/mission/OurMission'
import React from 'react'

const MisssionPage = () => {
    return (
        <>
            <section className="border-b border-fuchsia-400 bg-green-200 ">
                <MaxWidthWrapper className="pb-20 mt-2">
                    <div className="">
                        <OurMission />
                    </div>
                </MaxWidthWrapper>
            </section>
            <MaxWidthWrapper>
                <Roadmap />
            </MaxWidthWrapper>

        </>
    )
}

export default MisssionPage