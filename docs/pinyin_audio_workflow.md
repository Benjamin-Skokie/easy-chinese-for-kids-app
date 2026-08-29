# Pinyin audio workflow

The Pinyin course uses prerecorded MP3 clips so pronunciation works consistently in Chrome, Safari, iPadOS, macOS, and Windows browsers. Audio is created ahead of time; the public website never calls the OpenAI API.

## Source of truth

- Lesson words and readings: `src/features/foundations/pinyin-course.js`
- Audio catalog and reviewed exceptions: `src/features/foundations/pinyin-audio-manifest.js`
- Generator: `scripts/audio/generate-pinyin-basics.mjs`
- Web playback and exercise binding: `src/features/foundations/pinyin-runtime.js`
- Generated clips: `assets/audio/pinyin/`

The catalog is derived from the lesson examples. The same written character and Pinyin reading reuse one MP3 even when they occur in several chapters. Reviewed exceptions in the Basics list take priority over automatically derived records.

## Generate a chapter batch

Keep the API key only in `.env.local`; this file is ignored by Git.

```sh
npm run audio:pinyin-initials
node --env-file=.env.local scripts/audio/generate-pinyin-basics.mjs --chapters=9-12
node --env-file=.env.local scripts/audio/generate-pinyin-basics.mjs --chapters=13-17
```

The script uses `gpt-4o-mini-tts`, the `marin` voice, and MP3 output. Existing files are skipped, so rerunning a batch is safe and does not repeat paid API calls.

## Review and replace one clip

1. Test the chapter's green **Play all** button.
2. Click every sound card and example word.
3. Test enough practice rounds to hear every item; the game cycles without replacement.
4. Write down only the incorrect clip IDs.
5. Improve that record's `ttsInput` or `context` in the manifest.
6. Regenerate only those IDs:

```sh
node --env-file=.env.local scripts/audio/generate-pinyin-basics.mjs --force --only=course/ch03-example-id
```

Never regenerate an accepted clip. A corrected file keeps the same ID, so the lesson data and UI do not need to change.

## Publish safely

1. Increment `pinyinAudioVersion` after replacing audio.
2. Run `npm run build`.
3. Run `npm run check:paths`, `node --check app.js`, and `git diff --check`.
4. Check the total audio size with `du -ch assets/audio/pinyin/**/*.mp3`.
5. Commit only the manifest, runtime, generator, built app, and intended MP3 files.

Audio elements are created only when the learner clicks. Adding more MP3 files increases repository/download-on-demand storage, but it does not make the initial page download every recording.
