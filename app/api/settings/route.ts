import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const settingsFilePath = path.join(process.cwd(), 'user-settings.json');

export async function GET() {
  try {
    const data = await fs.readFile(settingsFilePath, 'utf-8');
    const settings = JSON.parse(data);
    return NextResponse.json(settings);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newSettings = await req.json();

    if (typeof newSettings !== 'object' || newSettings === null) {
      return NextResponse.json({ error: 'Invalid settings format' }, { status: 400 });
    }

    const existingData = await fs.readFile(settingsFilePath, 'utf-8');
    const existingSettings = JSON.parse(existingData);
    const updatedSettings = { ...existingSettings, ...newSettings };

    await fs.writeFile(settingsFilePath, JSON.stringify(updatedSettings, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Settings updated', settings: updatedSettings });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
