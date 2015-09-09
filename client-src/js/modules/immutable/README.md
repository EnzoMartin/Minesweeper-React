# Phauxy

Minimalist immutable library

## Features
- Consistent model used throughout
- Optional development errors when instantiating a model to show unfrozen items or properties
- Dictionary and Array expose functions similar to an array where available. (use map, forEach, reduce, length etc)
- Dictionary and Array expose a "values" javascript array, so the type can be used in other frameworks like lodash with minimal overhead (the usage of a frozen array vs thawed)
- Transactions to edit a dictionary, array or individual model
    - A new dictionary/array/model is only created if a transaction commit results in a change.

## Performance
- Performance is neat, but readability, maintainability and functionality come first.
- There are performance tests which will grow over time to make sure the library remains relatively snappy.

### Submitting performance improvements
- The changes you make should maintain readability and maintainability of the project
- Changes should be backed up with performance tests in /benchmark/modifications showing before/after with *significant* improvements
- Don't optimize just because it's really really fun. Keep the project simple.
- If performance is the most critical priority of your project consider not using any immutable libraries.

## Examples

**See the examples folder for small, executable examples of the various functions.**

### 1. You can disable immutability globally for performance in production

    Phauxy.Freezer.disable();
    
    // Any models created that use the Phauxy.Freezer to freeze their objects after this call will no longer be frozen.
    
    // Potentially allows the benefits of immutable development, error output and guarantees during development, but 
    // allows an optimized version to be published that does not freeze() any objects.

## Changelog

### 0.0.9 **Breaking Changes**
- Renamed ImmutableArray to ImmutableList
    - Find+Replace "Phauxy.Array" with "Phauxy.List"
    - Makes it a clearer that it's not actually an array [] but an object that can be treated like an array
    - Opens the door for future development of Phauxy.Stack/Queue etc.

### 0.0.8
- Model transactions now initiate a transaction on any child immutable models
    - Deep objects will only update if they result in a change
- EnumerableTransactionFactory includes #set() to update the values of the dictionary/array

### 0.0.7 **Breaking Changes**
- Added a generic model to accept arbitrary object and convert it to a generic model.
- Dictionary/Array will convert all plain objects into GenericModels
    - Dictionary/Array no longer assert if the supplied object isn't an instance of ImmutableModel
- index.js interface model extension changed from Phauxy.Model to Phauxy.Model.Extend **Breaking Change**
    - Find+Replace "Phauxy.Model" with "Phauxy.Model.Extend"
- index.js interface Phauxy.Model now creates a generic model
- index.js interface now has caps/no caps so users can choose between "Phauxy.Model" and "immutable.model" and the like
    - All examples will still use Phauxy.Model because that's my preference for types

### 0.0.6
- Added ImmutableOptimizer with a model method. The method caches the keys and attaches it to the model as a hidden property.
- Model now has a method "package" to call which will optimize and deep freeze the object. This is not a breaking change.

        // Instead of calling the freezer directly at the base of their constructor
        Phauxy.Freezer.deepFreeze(this);

        // The model should now call which will optimize and deep freeze the model.
        this.package();

### 0.0.5
- Freezer now includes a deepFreeze method to freeze all required properties of a model. Removes some of the suck of calling Phauxy.Freezer.freeze(this.[property]) for models containing properties with objects/arrays

        // Instead of multiple calls to freeze
        Phauxy.Freezer.freeze(this);
        Phauxy.Freezer.freeze(this.myArray);
        Phauxy.Freezer.freeze(this.myObject);

        // A single call can be done which will deep-freeze all items that require it on the model
        Phauxy.Freezer.deepFreeze(this);

### 0.0.4
- Immutable Model now includes a transaction with a set method. Allows for models to be manipulated inline:
    
        // model will be a new model if the value of 'text' is different, otherwise existing will be returned from the commit
        var model = existing.transaction().set('text', 'Hello World!').commit();
        
### 0.0.3
- ImmutableDictionary/ImmutableList now test depth during equality test

### 0.0.2
- Added ImmutableFreezer. Used internally to freeze objects and check their frozen state, allowing the freezer to be disabled.

### 0.0.1
- Made key optional on add transactions method. Makes more sens using the method with the ImmutableList.
- Changed development error messages to thrown exceptions. If you're using an immutable collection/model then it's a critical error if it's not immutable. Don't use immutable if you need to mutate.
- Added unit tests
- Base ImmutableObject now implements a 'deep' equals. It will only go deep on other items that inherit from ImmutableModel.
- Transaction data no longer exist in a closure, but with the transaction object. Once the transaction object is out of scope the entire transaction should be cleaned up.

### 0.0.0
- Initial idea

## Potential changes

- IE9 compatibility without using shims/shams
    - It might work now, but it's never been tested.

- ImmutableList.transaction().set() will update all items in an array if an item is inserted at the start of the array. It should instead work out it only needs to do one operation instead of discarding the entire array.

- Include generic model transforms during an enumerable transaction
    - Future modification methods may expect the item to be an ImmutableModel
    
- More docs, more examples.