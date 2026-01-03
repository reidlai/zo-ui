"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TailwindAdapter = void 0;
class TailwindAdapter {
    name = '@zo-ui/adapter-tailwind';
    async generate(schema, options) {
        console.log(`Generating Tailwind HTML for ${schema.name}...`);
        const fields = schema.fields.map(f => `
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="${f.name}">
        ${f.name}
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="${f.name}" type="text" placeholder="${f.name}">
    </div>`).join('\n');
        const html = `<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">\n${fields}\n</form>`;
        console.log(html);
    }
}
exports.TailwindAdapter = TailwindAdapter;
//# sourceMappingURL=index.js.map