const fs = require('fs');
const path = 'components/chat/chat-room.tsx';
let s = fs.readFileSync(path, 'utf8');
let changed = false;

// Remove the offline toggle button block
// Pattern: <button onClick={onToggleOfflineMode} ... </button>\n
s = s.replace(/[\t ]*<button\s*\n[\t ]*onClick=\{onToggleOfflineMode\}[\s\S]*?<\/button>\s*\n/g, function(m) {
  changed = true;
  return '';
});
console.log('1. Offline toggle:', changed ? 'removed' : 'not found');

// Remove the emoji button block
// Pattern: <button onClick={onToggleEmojiPanel} ... </button>\n
let emoji_removed = false;
s = s.replace(/[\t ]*<button onClick=\{onToggleEmojiPanel\}[\s\S]*?<\/button>\s*\n/g, function(m) {
  emoji_removed = true;
  changed = true;
  return '';
});
console.log('2. Emoji button:', emoji_removed ? 'removed' : 'not found');

// Remove the AI trigger button block: {!isGenerating && ( <button ... </button> )}
let trigger_removed = false;
s = s.replace(/[\t ]*\{!isGenerating\s*&&\s*\([\s\S]*?onTriggerAIResponse[\s\S]*?<\/button>\s*\)\s*\}/g, function(m) {
  trigger_removed = true;
  changed = true;
  return '';
});
console.log('3. AI trigger button:', trigger_removed ? 'removed' : 'not found');

fs.writeFileSync(path, s, 'utf8');
if (changed) console.log('Changes saved!');
else console.log('No changes were made - patterns may need adjustment');
