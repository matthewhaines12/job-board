import { getSavedJobs } from "../../services/apiUsers";
import { useAuth } from "../../contexts/AuthContext";

const SavedJobs = () => {
  const { user, accessToken, loading } = useAuth();

  const handleClick = async () => {
    if (!user || !accessToken) {
      console.log("User not logged in");
      return;
    }

    try {
      const data = await getSavedJobs(accessToken);
      console.log("saved jobs info: ", data);
    } catch (error) {
      console.error("Failed to fetch saved jobs:", error);
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="saved-jobs">
      <button onClick={handleClick} disabled={!user}>
        View Saved Jobs
      </button>
    </div>
  );
};

export default SavedJobs;
