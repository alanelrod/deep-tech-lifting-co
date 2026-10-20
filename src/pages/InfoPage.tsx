import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PAGES: Record<string, { title: string; kicker: string; sections: { heading: string; body: string }[] }> = {
  "/support": {
    title: "Support",
    kicker: "Help",
    sections: [
      {
        heading: "Sizing",
        body: "These pieces are cut true, with room through the chest and shoulder on the hoodie. If you are between sizes, take the larger one in fleece and your usual size in the tank, shorts, and pants.",
      },
      {
        heading: "Care",
        body: "Wash cold, inside out. Hang dry. The prints are built to stay, and high heat is how they don't.",
      },
      {
        heading: "Questions",
        body: "This shop keeps messages in the browser. Join the member list from the account icon and we store the email on this device only — nothing is sent to a server.",
      },
    ],
  },
  "/shipping": {
    title: "Shipping",
    kicker: "Delivery",
    sections: [
      {
        heading: "Rates",
        body: "Shipping is $8. It is free on orders of $120 or more — the hoodie plus the tank clears it, and so does the full set.",
      },
      {
        heading: "Timing",
        body: "Orders leave the studio in 3 to 5 business days. You get a note when they move.",
      },
      {
        heading: "This preview",
        body: "Checkout on this site records a request in your browser. No payment is taken and nothing is shipped.",
      },
    ],
  },
  "/returns": {
    title: "Returns",
    kicker: "Returns",
    sections: [
      {
        heading: "Window",
        body: "Unworn pieces can come back within 30 days. They should be unwashed, with the tags still on.",
      },
      {
        heading: "How",
        body: "Start from the order note in your confirmation. We send a label. Refunds go back the way they came, once the piece is checked in.",
      },
      {
        heading: "Final sale",
        body: "Nothing in the current line is final sale. If a later drop is, it will say so on the piece.",
      },
    ],
  },
  "/privacy": {
    title: "Privacy",
    kicker: "Privacy",
    sections: [
      {
        heading: "What stays here",
        body: "Your bag, member email, checkout request, and waitlist details are stored in this browser. They are not sent to a server, and they are not shared.",
      },
      {
        heading: "Waitlist",
        body: "Joining a waitlist saves your name, email, phone, and address in this browser, with the piece and size. No card numbers. No accounts with passwords. Google Analytics measures visits on this site.",
      },
      {
        heading: "Clearing it",
        body: "Clear this site's local storage in your browser and the bag, the list, and the last request are gone.",
      },
    ],
  },
};

export function InfoPage() {
  const { pathname } = useLocation();
  const page = PAGES[pathname];

  useEffect(() => {
    document.title = page ? `${page.title} — Deep Tech Lifting Club` : "Deep Tech Lifting Club";
  }, [page]);

  if (!page) return null;

  return (
    <div className="wrap info">
      <header className="page-head">
        <p className="kicker">{page.kicker}</p>
        <h1>{page.title}</h1>
      </header>
      <div className="info-sections">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
