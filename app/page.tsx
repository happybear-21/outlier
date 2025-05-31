import { getSettingField, createSettings } from "@/lib/supabase/queries/settings";

export default async function Home() {
  const result = await getSettingField("username")
  if (!result) {
    await createSettings()
  }
  const username = result ?? "Guest"
  return (
    <div className="px-6 py-4">
      <h1>Workspaces</h1>
      <p>{username}</p>
    </div>
  );
}
