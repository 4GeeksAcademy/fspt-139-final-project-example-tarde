import { useEffect, useState } from "react";
import { getTeam } from "../services/teamService";

export const Team = () => {

    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadTeam = async () => {

            try {

                const data = await getTeam();

                setTeam(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        loadTeam();

    }, []);

    if (loading) {

        return (
            <div className="container py-5">
                <p>Loading team...</p>
            </div>
        );

    }

    return (

        <div className="container py-5">

            <h1 className="mb-4">
                Team
            </h1>

            <div className="row">

                {team.map((member) => (

                    <div
                        key={member.id}
                        className="col-md-4 mb-4"
                    >

                        <div className="card h-100">

                            <div className="card-body">

                                <h5 className="card-title">
                                    {member.name}
                                </h5>

                                <p className="card-text">
                                    {member.role}
                                </p>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
};