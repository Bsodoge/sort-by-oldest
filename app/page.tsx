import Form from "./components/Form";

export default function Home() {
  return (
    <div className="">
      <header className="flex">
          <img src="" alt="Github Logo" />
      </header>
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl">Sort by Oldest</h1>
          <h2>Find comments from a <em className="italic">long</em> time ago...</h2>
        </div>
        <Form></Form>
      </div>
    </div>
  );
}
