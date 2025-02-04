import { Link } from "#root/components/Link/Link";
import { usePageContext } from "vike-react/usePageContext";
import "#root/assets/css/reset.css";

export { Page };

function Page() {

  const pageContext = usePageContext();

  let msg: string; // Message shown to the user
  const { abortReason, abortStatusCode } = pageContext;

  if (typeof abortReason === "string") {
    // Handle `throw render(abortStatusCode, `You cannot access ${someCustomMessage}`)`
    msg = abortReason;
  }  
  
  if (abortStatusCode === 403) {
    // Handle `throw render(403)`
    msg =
      "You cannot access this page because you don't have enough privileges.";
  } else if (abortStatusCode === 401) {
    // Handle `throw render(401)`
    msg =
      "You cannot access this page because you aren't logged in. Please log in.";
  } else {
    // Fallback error message
    msg = pageContext.is404
      ? "This page doesn't exist."
      : "Something went wrong. Try again (later).";
  }

  return (
    <Center>
      <p style={{ fontSize: "1.3em", textAlign: "center", margin: 0 }}>{msg}</p>
    </Center>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        style={{
          height: "calc(100vh - 100px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          {children}
          <div style={{ textAlign: "center", margin: 0 }}>
            <Link style={{ fontSize: "1.3em" }} href="/">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
