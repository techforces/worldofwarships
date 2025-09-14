interface ErrorPageProps {
  message: string;
}

const ErrorPage = ({ message }: ErrorPageProps) => (
  <div className="fixed w-full h-full bg-[#001438] z-10 flex items-center justify-center px-[min(10vw,10rem)]">
    <p>{message}</p>
  </div>
);

export default ErrorPage;
