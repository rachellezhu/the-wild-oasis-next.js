export default function Page() {
  return (
    <div className="text-center space-y-6 mt4">
      <h1 className="text-3xl font-semibold">
        Thank you for your reservation!
      </h1>

      <a
        href="/account/reservations"
        className="underline text-xl text-accent-500 inline-block"
      ></a>
    </div>
  );
}
