import initialFriendsTyped from "../Typed";

export default function Friend({
  friend,
  handleSelectBtn,
  selectedId
}: {
  friend: initialFriendsTyped;
  handleSelectBtn: (userId: number) => void;
  selectedId: number;
}) {
  const isSelected = friend.id === selectedId;
  return (
    <div key={friend.id} className="flex items-center p-4 border-slate-300">
      <img
        src={friend.image}
        alt={friend.name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex w-full gap-4 justify-between">
        <div>
          <h2 className="text-lg font-semibold text-blue-500">{friend.name}</h2>
          {friend.balance < 0 && (
            <p className="text-red-500 font-semibold text-sm">
              You owe {friend.name + " " + Math.abs(friend.balance)}
            </p>
          )}
          {friend.balance > 0 && (
            <p className="text-green-600 font-semibold text-sm">
               {friend.name } owes you {Math.abs(friend.balance)}
            </p>
          )}
          {friend.balance === 0 && (
            <p className="text-orange-400 font-semibold text-sm">
              You and {friend.name + " are even"}
            </p>
          )}
        </div>
        <button
          className="border bg-teal-600 my-[6px] px-2 bl rounded-md text-white font-medium"
          onClick={() => {
            handleSelectBtn(friend.id);
          }}
        >
          {isSelected ? 'Close' : 'Select'}
        </button>
      </div>
    </div>
  );
}
