
export default function Footer() {
    return (
      <footer className="bg-slate-800 p-8 flex justify-center items-center text-gray-400 text-sm">
        <p>Copyright ©️ Miggy's Munchies {new Date().getFullYear()}</p>
      </footer>
    );
}