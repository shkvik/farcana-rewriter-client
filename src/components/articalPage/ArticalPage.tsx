import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Result, Badge, Descriptions, Typography, Space  } from 'antd';

const { Text } = Typography;

const ArticalPage: React.FC = () => {

    const { id } = useParams();

    if(false) {
        return <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary"><Link to={'/articles'}> Back Home </Link></Button>}
      />
    }

    var value = "Zelda: Tears of the Kingdom owes its design to one of the most overlooked developers";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value);
    };

    return (
        <div>
            <Descriptions title="User Info" layout="vertical" bordered size='middle' extra={<Button type="primary">Edit</Button>}>

                <Descriptions.Item label="Title">
                    {value}
                </Descriptions.Item>

                <Descriptions.Item label="Description">
                    The sequel’s immersive-sim sensibilities are already on full display
                </Descriptions.Item>

                <Descriptions.Item label="Author">
                Mike Mahardy
                </Descriptions.Item>

                <Descriptions.Item label="Date">
                    2018-04-24 18:00:00
                </Descriptions.Item>

                <Descriptions.Item label="Status">
                <Badge status="processing" text="Running" />
                </Descriptions.Item>

                <Descriptions.Item label="Date">
                    2018-04-24 18:00:00
                </Descriptions.Item>

                <Descriptions.Item label="Article" span={3}>
                We take it for granted when modern video games allow us to solve a puzzle, or survive a combat encounter, or get from Point A to B in more ways than one. “Player freedom” is baked into many tentpole releases — especially open-world games, which rely on your sustained curiosity even after you’ve repeated the same general objective ad nauseum. Sure, you’re about to clear your second enemy outpost in 10 minutes — but this time, you could be stealthy. In 2017, The Legend of Zelda: Breath of the Wild was remarkable (it still is) for how much real freedom it granted the player. Its physics system, weather patterns, survival elements, Rune abilities, and robust inventory all coalesced into a dizzying number of possible solutions to any given problem. There’s a reason speedrunners flock to it. Yes, you can roam from Bokoblin camp to Bokoblin camp, slaying each foe with a club, spear, or bow and arrow. But you can also build up an electrical charge in your sword during a thunderstorm, then toss it into an enemy mob a split second before lightning strikes. Related Tears of the Kingdom is a playground for goblins That open-ended nature is a huge part of The Legend of Zelda: Breath of the Wild’s longevity, and based on everything we’ve seen from Tears of the Kingdom’s trailers and gameplay presentations, Nintendo is doubling down on player freedom in the sequel. With his newfound Zonai abilities, which let him warp through ceilings, fuse outrageous weapons, rewind moving objects along their recent trajectory, and build entire vehicles, Link is basically a magical engineer now. I played over an hour of Tears of the Kingdom last week, and I’m still thinking about all of the tricks I didn’t try. There’s a term for this kind of game: immersive sim. Like most subgenre monikers, its definition is not always agreed upon, and it’s often misused (by me), but to sum it up as succinctly as possible, immersive sims are games that try to say “yes” to the player as often as possible. It’s more of a design philosophy, really. And although Tears of the Kingdom seems poised to be the biggest immersive sim ever, this dedication to player choice actually goes back several decades, to the work of one studio that was making PC games in the ’90s. Looking Glass Studios, previously Blue Sky Productions, was formed in 1990 by a collection of like-minded developers who saw video games as an opportunity to make story-driven 3D worlds. They also wanted to stress player empowerment and get away from the idea of video games as a linear experience. The studio released games such as Ultima Underworld: The Stygian Abyss, System Shock and its sequel, and Thief: The Dark Project. Like Breath of the Wild and its sequel, these games each gave players numerous ways to solve puzzles or eliminate enemies (even if those options were limited compared to what’s possible today). Related Ahead of its time: the history of Looking Glass Studios Despite its pioneering sensibilities, Looking Glass Studios shuttered in 2000 after difficulties with a series of publishers. Regardless, many of its employees continued making immersive sims, or at least put the skills and institutional expertise they accrued at Looking Glass to good use: Bioshock, Guitar Hero, and even the Xbox itself all sprang from former Looking Glass designers. Arkane Studios is perhaps the most prominent torchbearer of the immersive sim, with games like Dishonored, Prey, and Deathloop. Arkane’s impending release Redfall also seems rooted in the mindset that Looking Glass helped establish. Tears of the Kingdom isn’t an anomaly in the realm of modern AAA games that pull from the immersive sim school of thought — apart from Arkane, IO Interactive has pushed the subgenre to its comedic extremes with Hitman World of Assassination, for instance. A System Shock remake is also on its way at the end of May. But it is exciting to see Nintendo, a company mainly known for extremely fine-tuned games that don’t necessarily let the player cause trouble, doubling down on what I consider to be the most exciting element of Breath of the Wild’s design: a willingness to let the player bend the rules. And come May 12, I’m hoping I even get to break a few.
                </Descriptions.Item>

                <Descriptions.Item label="Rewrited" span={3}>
                We take it for granted when modern video games allow us to solve a puzzle, or survive a combat encounter, or get from Point A to B in more ways than one. “Player freedom” is baked into many tentpole releases — especially open-world games, which rely on your sustained curiosity even after you’ve repeated the same general objective ad nauseum. Sure, you’re about to clear your second enemy outpost in 10 minutes — but this time, you could be stealthy. In 2017, The Legend of Zelda: Breath of the Wild was remarkable (it still is) for how much real freedom it granted the player. Its physics system, weather patterns, survival elements, Rune abilities, and robust inventory all coalesced into a dizzying number of possible solutions to any given problem. There’s a reason speedrunners flock to it. Yes, you can roam from Bokoblin camp to Bokoblin camp, slaying each foe with a club, spear, or bow and arrow. But you can also build up an electrical charge in your sword during a thunderstorm, then toss it into an enemy mob a split second before lightning strikes. Related Tears of the Kingdom is a playground for goblins That open-ended nature is a huge part of The Legend of Zelda: Breath of the Wild’s longevity, and based on everything we’ve seen from Tears of the Kingdom’s trailers and gameplay presentations, Nintendo is doubling down on player freedom in the sequel. With his newfound Zonai abilities, which let him warp through ceilings, fuse outrageous weapons, rewind moving objects along their recent trajectory, and build entire vehicles, Link is basically a magical engineer now. I played over an hour of Tears of the Kingdom last week, and I’m still thinking about all of the tricks I didn’t try. There’s a term for this kind of game: immersive sim. Like most subgenre monikers, its definition is not always agreed upon, and it’s often misused (by me), but to sum it up as succinctly as possible, immersive sims are games that try to say “yes” to the player as often as possible. It’s more of a design philosophy, really. And although Tears of the Kingdom seems poised to be the biggest immersive sim ever, this dedication to player choice actually goes back several decades, to the work of one studio that was making PC games in the ’90s. Looking Glass Studios, previously Blue Sky Productions, was formed in 1990 by a collection of like-minded developers who saw video games as an opportunity to make story-driven 3D worlds. They also wanted to stress player empowerment and get away from the idea of video games as a linear experience. The studio released games such as Ultima Underworld: The Stygian Abyss, System Shock and its sequel, and Thief: The Dark Project. Like Breath of the Wild and its sequel, these games each gave players numerous ways to solve puzzles or eliminate enemies (even if those options were limited compared to what’s possible today). Related Ahead of its time: the history of Looking Glass Studios Despite its pioneering sensibilities, Looking Glass Studios shuttered in 2000 after difficulties with a series of publishers. Regardless, many of its employees continued making immersive sims, or at least put the skills and institutional expertise they accrued at Looking Glass to good use: Bioshock, Guitar Hero, and even the Xbox itself all sprang from former Looking Glass designers. Arkane Studios is perhaps the most prominent torchbearer of the immersive sim, with games like Dishonored, Prey, and Deathloop. Arkane’s impending release Redfall also seems rooted in the mindset that Looking Glass helped establish. Tears of the Kingdom isn’t an anomaly in the realm of modern AAA games that pull from the immersive sim school of thought — apart from Arkane, IO Interactive has pushed the subgenre to its comedic extremes with Hitman World of Assassination, for instance. A System Shock remake is also on its way at the end of May. But it is exciting to see Nintendo, a company mainly known for extremely fine-tuned games that don’t necessarily let the player cause trouble, doubling down on what I consider to be the most exciting element of Breath of the Wild’s design: a willingness to let the player bend the rules. And come May 12, I’m hoping I even get to break a few.
                </Descriptions.Item>

        </Descriptions>
        </div>
    );
};

export default ArticalPage;