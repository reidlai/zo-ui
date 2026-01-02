# Data Model: Enhance Reading Schema

**Branch**: `002-enhance-reading-schema` | **Date**: 2026-01-02

## Core Entities

### 1. UI Tree (Intermediate Representation)
 The `UITree` is the language-agnostic result of the `SchemaResolver`. It represents the resolved structure of the UI to be generated.

```mermaid
classDiagram
    class UITree {
        +root: UINode
    }
    class UINode {
        <<interface>>
        +type: "component" | "container"
        +fieldName: string
        +isRequired: boolean
    }
    class ComponentNode {
        +type: "component"
        +componentId: string
        +zodType: string
        +metadata: Record<string, any>
    }
    class ContainerNode {
        +type: "container"
        +children: Map<string, UINode>
    }

    UITree --* UINode
    UINode <|-- ComponentNode
    UINode <|-- ContainerNode
```

### 2. Component Registry
Mapping used by the Resolver to determine Component IDs.

| Source | Priority | Example |
| :--- | :--- | :--- |
| **Metadata** | 1 (Highest) | `.describe("ui:textarea")` |
| **Config** | 2 | `zo.config.json: { "zod.string": "textarea" }` |
| **Default** | 3 (Lowest) | `zod.string` -> `input-text` |

### 3. Generated File
Atomic unit of output from an Adapter.

fields:
- `filename`: string (e.g., `UserForm.svelte`)
- `content`: string (Source code)
