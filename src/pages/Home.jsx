import { ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

const Home = () => {
    return (
        <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />

            <main
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "10rem",
                }}
            >
                {/* Hero Section */}
                <section
                    className="container"
                    style={{ textAlign: "center", maxWidth: "800px", marginBottom: "6rem" }}
                >
                    <p
                        style={{
                            color: "var(--accent-purple)",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            fontSize: "0.875rem",
                            marginBottom: "1.5rem",
                        }}
                    >
                        INSTITUTIONAL DATA PLATFORM
                    </p>

                    <h1 className="h1" style={{ marginBottom: "1.5rem", color: "var(--text-primary)" }}>
                        Empowering Academic Excellence Through <br />
                        <span className="text-gradient">Student Insights</span>
                    </h1>

                    <p
                        style={{
                            fontSize: "1.125rem",
                            color: "var(--text-secondary)",
                            marginBottom: "3rem",
                            lineHeight: 1.6,
                            maxWidth: "600px",
                            margin: "0 auto 3rem",
                        }}
                    >
                        A cutting-edge platform to aggregate student feedback, drive academic growth, and
                        unlock the potential of every classroom.
                    </p>

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                        <Button
                            style={{
                                padding: "1rem 2.5rem",
                                borderRadius: "100px",
                                backgroundColor: "#22c55e",
                                color: "white",
                                fontWeight: "600",
                                boxShadow: "0 6px 18px rgba(34,197,94,0.35)",
                            }}
                        >
                            Get Started Free
                        </Button>

                        <Button
                            style={{
                                padding: "1rem 2.5rem",
                                borderRadius: "100px",
                                backgroundColor: "white",
                                color: "var(--text-primary)",
                                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                            }}
                        >
                            View Demo
                        </Button>
                    </div>
                </section>

                {/* Status Indicators */}
                <section
                    style={{
                        backgroundColor: "var(--bg-dark)",
                        borderRadius: "100px",
                        padding: "1.5rem 3rem",
                        display: "flex",
                        gap: "4rem",
                        color: "white",
                        boxShadow: "var(--shadow-lg)",
                        marginBottom: "8rem",
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "0.75rem", opacity: 0.6 }}>DATABASE</p>
                        <p style={{ fontWeight: 600 }}>Communicating</p>
                    </div>

                    <div style={{ width: "1px", backgroundColor: "rgba(255,255,255,0.1)" }}></div>

                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "0.75rem", opacity: 0.6 }}>AI ENGINE</p>
                        <p style={{ fontWeight: 600 }}>Running</p>
                    </div>

                    <div style={{ width: "1px", backgroundColor: "rgba(255,255,255,0.1)" }}></div>

                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "0.75rem", opacity: 0.6 }}>ANALYTICS</p>
                        <p style={{ fontWeight: 600 }}>Syncing</p>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container" style={{ marginBottom: "6rem" }}>
                    <div
                        style={{
                            backgroundColor: "var(--bg-dark)",
                            borderRadius: "1.5rem",
                            padding: "4rem",
                            textAlign: "center",
                            color: "white",
                            boxShadow: "var(--shadow-xl)",
                        }}
                    >
                        <h2 className="h2" style={{ marginBottom: "1rem" }}>
                            Ready to transform your institution?
                        </h2>

                        <p
                            style={{
                                color: "rgba(255,255,255,0.7)",
                                maxWidth: "500px",
                                margin: "0 auto 3rem",
                                fontSize: "1.125rem",
                            }}
                        >
                            Join the 500+ academic frameworks using AssessMate to build a data-driven future.
                        </p>

                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                            <Button
                                style={{
                                    padding: "1rem 2.5rem",
                                    borderRadius: "100px",
                                    backgroundColor: "#22c55e",
                                    color: "white",
                                    fontWeight: "600",
                                    boxShadow: "0 6px 18px rgba(34,197,94,0.35)",
                                }}
                            >
                                Get Started Free
                            </Button>

                            <Button
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    color: "white",
                                    padding: "1rem 2.5rem",
                                    borderRadius: "100px",
                                }}
                            >
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Home;